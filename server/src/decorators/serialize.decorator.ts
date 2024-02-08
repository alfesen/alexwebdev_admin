import { UseInterceptors } from "@nestjs/common";
import { SerializeConstructor, SerializeInterceptor } from "src/interceptors/serialize.interceptor";

export function Serialize<T>(dto: SerializeConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
