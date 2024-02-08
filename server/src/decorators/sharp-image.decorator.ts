import { ParseFilePipe, UploadedFile } from "@nestjs/common"
import { SharpPipe } from "src/pipes/sharp/sharp.pipe"

export function SharpImage(width: number, required: boolean) {
  return UploadedFile(
    new ParseFilePipe({
      fileIsRequired: required,
    }),
    new SharpPipe(width, required),
  )
}
