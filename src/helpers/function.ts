import { IModelQueue, IModelUser } from "@/models/Model";
import moment from "moment";
import "moment/locale/th";

moment.locale("th");

export const getUserName = (
  user: Partial<IModelUser | IModelQueue> | undefined,
  format?: number
) => {
  if (!user) return;
  else if ("firstNameTH" in user) {
    switch (format) {
      case 1:
        return `${user.firstNameEN} ${user.lastNameEN}`; // John Doe
      case 2:
        return `${user.firstNameEN?.toLowerCase()} ${user.lastNameEN?.toLowerCase()}`; // john doe
      case 3:
        return `${user.firstNameEN} ${user.lastNameEN?.slice(0, 1)}.`; // John D.
      default:
        if (user.firstNameTH)
          return `${user.firstNameTH} ${user.lastNameTH}`; // กข คง
        else if (user.email) return user.email;
        return "";
    }
  } else if ("firstName" in user) {
    if (user.firstName) return `${user.firstName} ${user.lastName}`;
    return "";
  }
};

export const dateFormatter = (
  date: string | Date | undefined,
  timeOnly: boolean = false,
  format?: number
) => {
  if (!date) return;
  if (timeOnly) {
    if (!(date as string).includes("T"))
      return moment(`1970-01-01T${date}`).format("LT"); // 16:00
    else return moment(date).format("LTS"); // 16:05:25
  }
  switch (format) {
    case 1:
      return moment(date).add(543, "years").format("LL"); // 21 ธันวาคม 2567
    default:
      return moment(date).add(543, "years").format("ll"); // 21 ธ.ค. 2567
  }
};

export const getKeyByValue = (object: any, value: any) => {
  return Object.keys(object).find(
    (key) => object[key] == value
  ) as keyof object;
};

export const getValueEnumByKey = (Enum: any, key: string): string => {
  return Enum[key as keyof typeof Enum] ?? "";
};

export const getKeyEnumByValue = (Enum: any, value: string): string => {
  return Object.keys(Enum)[Object.values(Enum).indexOf(value)] ?? "";
};

export const sortData = (
  data: any[] | undefined,
  key: string,
  typeKey: string = "number",
  typeSort: string = "asc"
) => {
  const isAscending = ["asc", "ASC"].includes(typeSort);
  data?.sort((a, b) => {
    const aValue =
      a[key] ?? (typeKey === "number" ? 0 : typeKey === "boolean" ? false : "");
    const bValue =
      b[key] ?? (typeKey === "number" ? 0 : typeKey === "boolean" ? false : "");
    if (typeKey === "number") {
      return isAscending ? aValue - bValue : bValue - aValue;
    } else if (typeKey === "string") {
      return isAscending
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeKey === "boolean") {
      return isAscending
        ? Number(bValue) - Number(aValue)
        : Number(aValue) - Number(bValue);
    } else return 0;
  });
};
