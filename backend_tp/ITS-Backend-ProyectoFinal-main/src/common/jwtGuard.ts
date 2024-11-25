import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import { Observable } from 'rxjs'
import { AuthGuard } from '@nestjs/passport';   
import { Reflector} from '@nestjs/core'
import { IS_PUBLIC_KEY } from './keys/public.key';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly reflector: Reflector){
        super()
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
    

}