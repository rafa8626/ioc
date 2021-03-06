import { Type } from "./interfaces/type";
import { GenericDecorator } from "./types";

export const Injector = () : GenericDecorator<Type<object>> => {
  return (target: Type<any>) => null;
};
