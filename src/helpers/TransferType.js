
export const ACTIVE_TEXT = "Active";
export const INACTIVE_TEXT = "InActive";
export const ACTIVE = 1;
export const INACTIVE = 2;
export const GROUP_EXPIRED_TEXT = "Expired";
export const GROUP_EXCESS_TEXT = "Excess";
export const GROUP_DAMAGE_TEXT = "Damage";
export const GROUP_EXPIRED = 1;
export const GROUP_EXCESS = 2;
export const GROUP_DAMAGE = 3;


class TransferType {
     static groupOptions = [
        {
            label: GROUP_EXPIRED_TEXT,
            value: GROUP_EXPIRED,
        },
        {
            label: GROUP_EXCESS_TEXT,
            value: GROUP_EXCESS,
        },
        {
            label: GROUP_DAMAGE_TEXT,
            value: GROUP_DAMAGE,
        }
    ]
     static statusOptions = [
        {
            label: ACTIVE_TEXT,
            value: ACTIVE
        },
        {
            label: INACTIVE_TEXT,
            value: INACTIVE
        }
    ]
}
export default TransferType;




