import { BASEURL } from "./../../utils/constant";
import axios from "axios";

export async function filterStudents({ key, value }: { key: string; value: string }) {
  try {
    const res = await axios.get(`${BASEURL}/filter?key=${key}&value=${value}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching filtered students:", error);
    return { students: [] }; // Return default structure
  }
}

export async function fetchStudents({ key, value }: { key: number; value: number }) {
  try {
    const res = await axios.get(`${BASEURL}?limit=${key}&skip=${value}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return { students: [], total: 0 };
  }
}
