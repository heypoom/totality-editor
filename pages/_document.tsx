import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

// import {getCssString} from '../stitches.config'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    const styles = (
      <>
        {initialProps.styles}

        {/* <style
          id="stitches"
          dangerouslySetInnerHTML={{__html: getCssString()}}
        /> */}
      </>
    )

    return {...initialProps, styles}
  }

  render() {
    return (
      <Html lang="en">
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
