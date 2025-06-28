import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryType'
import { addressType } from './addressType'
import { authorType } from './authorType'
import { blogCategoryType } from './blogCategoryType'
import { blogType } from './blogType'
import { brandType } from './brandType'
import { orderType } from './orderType'
import { productType } from './productType'
import { blockContentType } from './blockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    blockContentType,
    productType,
    brandType,
    orderType,
    blogCategoryType,
    blogType,
    authorType,
    addressType,
  ],
}
