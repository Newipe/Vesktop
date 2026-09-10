import { LazyComponentWrapper } from "../../utils/react";
import { FilterFn } from "../webpack";
import { ComponentType } from "react";
export declare function waitForComponent<T extends ComponentType<any> = ComponentType<any> & Record<string, any>>(name: string, filter: FilterFn | string | string[], fallbackValue?: ComponentType<any> | null): LazyComponentWrapper<T>;
export declare function waitForStore(name: string, cb: (v: any) => void): void;
