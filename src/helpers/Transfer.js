//Sale status
export const Transfer = {
  STATUS_DRAFT_TEXT: "Draft",
  STATUS_PENDING_TEXT: "Pending",
  STATUS_COMPLETED_TEXT: "Completed",
  STATUS_REVIEW_TEXT: "Review",
  STATUS_REOPEN_TEXT: "Reopen",
  TYPE_REFILL_DISTRIBUTION_TEXT: "Refill Distribution",
  TYPE_EXECESS_RETURN_TEXT: "Excess Return",
  TYPE_EXPIRED_RETURN_TEXT: "Expired Return",
  TYPE_ADDITIONAL_DISTRIBUTION_TEXT: 'Additional Distribution',
  TYPE_DAMAGE_RETURN_TEXT: 'Damage Return',
  TYPE_REFILL_DISTRIBUTION: 1,
  TYPE_EXECESS_RETURN: 2,
  TYPE_EXPIRED_RETURN: 3,
  TYPE_ADDITIONAL_DISTRIBUTION: 4,
  TYPE_DAMAGE_RETURN: 5,
  TRANSFER_REFILL_DISTRIBUTION: "transferDistribution",
  TRANSFER_EXECESS_RETURN: "transferExpired",
  TRANSFER_EXPIRED_RETURN: "transferReturn",
  TRANSFER_ADDITIONAL_DISTRIBUTION: "additionalDistribution",
  TRANSFER_DAMAGE_RETURN: "damageReturn",
  TRANSFER_ALL: "transferAll",

}

export const transferTypeOptions = [
  {
    value: Transfer.TYPE_REFILL_DISTRIBUTION,
    label: Transfer.TYPE_REFILL_DISTRIBUTION_TEXT,
  },
  {
    value: Transfer.TYPE_ADDITIONAL_DISTRIBUTION,
    label: Transfer.TYPE_ADDITIONAL_DISTRIBUTION_TEXT,

  },
  {
    value: Transfer.TYPE_EXECESS_RETURN,
    label: Transfer.TYPE_EXECESS_RETURN_TEXT,
  },
  {
    value: Transfer.TYPE_EXPIRED_RETURN,
    label: Transfer.TYPE_EXPIRED_RETURN_TEXT,
  },
  {
    value: Transfer.TYPE_DAMAGE_RETURN,
    label: Transfer.TYPE_DAMAGE_RETURN_TEXT,

  }
];

export const changeType = (data) => {
  if (data == Transfer.TYPE_EXPIRED_RETURN_TEXT) {
    return Transfer.TYPE_EXPIRED_RETURN
  }
  if (data == Transfer.TYPE_REFILL_DISTRIBUTION_TEXT) {
    return Transfer.TYPE_REFILL_DISTRIBUTION
  }
  if (data == Transfer.TYPE_EXECESS_RETURN_TEXT) {
    return Transfer.TYPE_EXECESS_RETURN
  }
  if (data == Transfer.TYPE_DAMAGE_RETURN_TEXT) {
    return Transfer.TYPE_DAMAGE_RETURN
  }
  if (data == Transfer.TYPE_ADDITIONAL_DISTRIBUTION_TEXT) {
    return Transfer.TYPE_ADDITIONAL_DISTRIBUTION
  }
}