import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons';
import { title } from 'process';

export const categoryType = defineType({
    name: 'category',
    type: 'document',
    title: 'Category',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (Rule) => Rule.required(), 
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'text'
        }),
        defineField({
            name: 'range',
            type: 'number',
            description: 'Starting from'
        }),
        defineField({
            name: 'featured',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'image',
            type: 'image',
            title: 'Category Image',
            options: {
                hotspot: true,
            }
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            media: 'image',
        }
    }
});