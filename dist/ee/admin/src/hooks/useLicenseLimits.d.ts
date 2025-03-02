interface UseLicenseLimitsArgs {
    enabled?: boolean;
}
declare function useLicenseLimits({ enabled }?: UseLicenseLimitsArgs): {
    license: {
        currentActiveUserCount: number;
        enforcementUserCount: number;
        features: (import("../../../../shared/contracts/admin").SSOFeature | import("../../../../shared/contracts/admin").AuditLogsFeature | import("../../../../shared/contracts/admin").ReviewWorkflowsFeature)[];
        isHostedOnStrapiCloud: boolean;
        licenseLimitStatus: unknown;
        permittedSeats: number;
        shouldNotify: boolean;
        shouldStopCreate: boolean;
    } | undefined;
    getFeature: <T>(name: "sso" | "audit-logs" | "review-workflows") => Record<string, T> | undefined;
    isError: boolean;
    isLoading: boolean;
};
export { useLicenseLimits };
export type { UseLicenseLimitsArgs };
