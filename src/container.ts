import "reflect-metadata";
import { Type } from "./interfaces/type";

// Using a constant instead of a class, allows to use singleton pattern
// meaning every time we use import, we will use the same element and not a new one
export const Container = new class {
    use<T>(target: Type<any>): T {
        const classParams = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = classParams.map(param => Container.use<any>(param));
        return new target(...injections);
    }
};