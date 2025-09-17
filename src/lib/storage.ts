import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const dataDir = join(process.cwd(), "data");

export function readData<T>(filename: string): T[] {
  try {
    const filePath = join(dataDir, `${filename}.json`);
    const data = readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function writeData<T>(filename: string, data: T[]): void {
  const filePath = join(dataDir, `${filename}.json`);
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function addData<T extends { id?: string }>(filename: string, item: T): T {
  const data = readData<T>(filename);
  const newItem = { ...item, id: item.id || Date.now().toString() };
  data.push(newItem);
  writeData(filename, data);
  return newItem;
}

export function updateData<T extends { id: string }>(filename: string, id: string, updates: Partial<T>): T | null {
  const data = readData<T>(filename);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...updates };
  writeData(filename, data);
  return data[index];
}

export function findData<T extends { id: string }>(filename: string, id: string): T | null {
  const data = readData<T>(filename);
  return data.find(item => item.id === id) || null;
}

export function findDataBy<T>(filename: string, predicate: (item: T) => boolean): T | null {
  const data = readData<T>(filename);
  return data.find(predicate) || null;
}

export function filterData<T>(filename: string, predicate: (item: T) => boolean): T[] {
  const data = readData<T>(filename);
  return data.filter(predicate);
}
