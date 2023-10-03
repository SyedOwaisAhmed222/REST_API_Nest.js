import { SetMetadata, applyDecorators} from "@nestjs/common"
import { ApiSecurity } from "@nestjs/swagger"
export const Roles = (...roles: string[]) => {
    return applyDecorators(
        ApiSecurity('authorization'),
        SetMetadata('roles', roles)
    )
    

}