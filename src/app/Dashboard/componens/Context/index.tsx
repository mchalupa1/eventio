import { createContext } from "react";
import { Event } from "../../page";
export const Data = createContext<Event[] | undefined>(undefined);