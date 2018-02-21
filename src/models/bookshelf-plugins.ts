export const upsert = (bookshelf: any) => {
  bookshelf.Model = bookshelf.Model.extend({
    upsert (attributes: any, options: any) {
      return this.save(attributes, { ...options, method: 'update' })
      .catch((err: any) => {
        if (err instanceof bookshelf.Model.NoRowsUpdatedError) {
          return this.save(attributes, { ...options, method: 'insert' })
        }
        throw err
      })
    }
  })
}

import * as BlueBird from 'bluebird'

declare module 'bookshelf' {
  interface Model<T extends Model<any>> extends ModelBase<T> {
    fetchPage(options?: PagedFetchOptions): BlueBird<PagedCollectionBase<T>>
    // upsert(key?: string, val?: any, options?: SaveOptions): BlueBird<T>;
    upsert(attrs?: { [key: string]: any }, options?: SaveOptions): BlueBird<T>;
  }

  interface PagedFetchOptions extends FetchOptions {
    /**
     * The number of elements to be returned in the page. Defaults to 10
     */
    pageSize?: number

    /**
     * The page number of the page to be returned. Starts at and defaults to 1
     */
    page?: number
  }

  interface Pagination {
    /**
     * The number of the page that was returned; starts at 1
     */
    page: number

    /**
     * The size of the page that was returned
     */
    pageSize: number

    /**
     * The total number of rows available
     */
    rowCount: number

    /**
     * The total number of pages available
     */
    pageCount: number
  }

  interface PagedCollectionBase<T extends Model<any>> extends CollectionBase<T> {
    pagination: Pagination
  }
}
