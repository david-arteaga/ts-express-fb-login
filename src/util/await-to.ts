/**
 * This function was taken from https://github.com/scopsy/await-to-js .
 * The only modification made was removing the type 'T | null' so the linter wouldn't complain that the variable could be null
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */

import * as BluebirdPromise from 'bluebird'

export function to<T, U = any>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U | null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, any]>(err => {
      if (errorExt) {
        Object.assign(err, errorExt)
      }

      return [err, null]
    })
}

export function tob<T, U = any>(
  promise: BluebirdPromise<T>,
  errorExt?: object
): BluebirdPromise<[U | null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, any]>(err => {
      if (errorExt) {
        Object.assign(err, errorExt)
      }

      return [err, null]
    })
}
