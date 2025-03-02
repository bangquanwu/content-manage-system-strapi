import { errors } from '@strapi/utils';
import { Entity, Pagination, SanitizedAdminUser } from './shared';
interface AuditLog extends Pick<Entity, 'id'> {
    date: string;
    action: string;
    /**
     * TODO: could this be better typed – working on the server-side code could indicate this.
     * However, we know it's JSON.
     */
    payload: Record<string, unknown>;
    user?: SanitizedAdminUser;
}
declare namespace GetAll {
    interface Request {
        body: {};
        query: {};
    }
    interface Response {
        data: {
            pagination: Pagination;
            results: AuditLog[];
        };
        error?: errors.ApplicationError;
    }
}
declare namespace Get {
    interface Request {
        body: {};
        query: {};
    }
    interface Params {
        id: Entity['id'];
    }
    type Response = AuditLog | {
        error?: errors.ApplicationError;
    };
}
export { AuditLog, GetAll, Get };
//# sourceMappingURL=audit-logs.d.ts.map