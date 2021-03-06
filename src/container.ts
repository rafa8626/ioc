import "reflect-metadata";
import { Type } from "./interfaces/type";
export class Container {
    private _instances = new Map();

    bind<T>(target: Type<any>): T {
        const key = target.name;
        
        if (!this._instances.get(key)) {
            console.log(`Generating new instance for ${key}...`);
            const classParams = Reflect.getMetadata('design:paramtypes', target) || [];
            const injections = classParams.map(param => this.bind<any>(param));
            this._instances.set(key, new target(...injections));
        }
        
        console.log(`=== Returning ${key} instance ===`);
        return this._instances.get(key);
    }
}