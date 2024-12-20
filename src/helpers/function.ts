import { IModelUser } from "@/models/Model";
import moment from "moment";

export const getUserName = (
  user: Partial<IModelUser> | undefined,
  format?: number
) => {
  if (!user) return;
  switch (format) {
    case 1:
      return `${user.firstNameEN} ${user.lastNameEN}`; // John Doe
    case 2:
      return `${user.firstNameEN?.toLowerCase()} ${user.lastNameEN?.toLowerCase()}`; // john doe
    case 3:
      if (user.firstNameTH) return `${user.firstNameTH} ${user.lastNameTH}`; // กข คง
      return "";
    default:
      return `${user.firstNameEN} ${user.lastNameEN?.slice(0, 1)}.`; // John D.
  }
};

export const dateFormatter = (
  date: string | Date | undefined,
  timeOnly: boolean = false,
  format?: number
) => {
  if (!date) return;
  if (timeOnly) return moment(`1970-01-01T${date}`).format("HH:mm"); // 16:00
  switch (format) {
    case 1:
      return moment(date).format("DD/MM/YYYY"); // 25/09/2024
    case 2:
      return moment(date).format("MMMM DD, YYYY HH:mm"); // September 25, 2024 14:17
    case 3:
      return moment(date).format("DD MMM YYYY"); // 8 Dec 2023
    default:
      return moment(date).format("MMM DD, YYYY HH:mm"); // Sep 25, 2024 14:42
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
