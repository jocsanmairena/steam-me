import { Container, Typography, Box, Button } from '@material-ui/core'
import Link from 'next/link'


export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box mr={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js, Material-UI and TypeScript example!
        </Typography>
        <Link href="/about">
          <Button variant="contained" color="primary">
            Go to the About Page
          </Button>
        </Link>
      </Box>

    </Container>
  )
}


//Next prefetches pages before even navigating to it.
