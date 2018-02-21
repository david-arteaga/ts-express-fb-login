export const nonNegativeIntegerConstraint = {
  numericality: {
    onlyInteger: true,
    noStrings: true,
    greaterThanOrEqualTo: 0
  }
}

export const positiveIntegerConstraint = {
  numericality: {
    onlyInteger: true,
    noStrings: true,
    greaterThanOrEqualTo: 1
  }
}

export const gameIdConstraint = {
  presence: true,
  numericality: {
    onlyInteger: true,
    noStrings: true,
    greaterThanOrEqualTo: 1,
    lessThanOrEqualTo: 64,
  }
}
