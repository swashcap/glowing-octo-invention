import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Object representing a presentable image' })
export class Image {
  @Field({
    description: `Text describing a contentful image for non-visual use.

The presence of this field indicates the image is contentful, and thus relevant as content within
its view. This field should be set using the platform-appropriate accessibility property (\`alt\`,
\`accesibilityLabel\`, \`android:contentDescription\`, etc.)`,
    nullable: true
  })
  accessibilityLabel?: string
  @Field(type => Int, { description: "Image's height in pixels" })
  height: number

  @Field()
  url: string

  @Field(type => Int, { description: "image's width in pixels" })
  width: number
}

@ObjectType()
export class ScalableImage extends Image {
  @Field({
    description: "The asset's scalable factor (ex. `1x`, `1.5x`, `2x`, etc.) "
  })
  scaleFactor: string
}

@ObjectType()
export class ScalableImageCollection {
  @Field()
  scale_1x: ScalableImage
  @Field()
  scale_1_5x?: ScalableImage
  @Field()
  scale_2x: ScalableImage
  @Field()
  scale_3x?: ScalableImage
  @Field()
  scale_4x?: ScalableImage
}
