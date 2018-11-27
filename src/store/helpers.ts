import { Identifiable, Indexed } from "@/types/store";

export const isDefined = <T> (x: T) => x !== undefined
export const indexer = <T extends Identifiable>(table: Indexed<T>, current: T): Indexed<T> => ({
  ...table, [current.id]: current
})