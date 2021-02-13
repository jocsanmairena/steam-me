import { Container, Typography, Box, Button } from '@material-ui/core'
import Link from 'next/link'


export default function About() {
  return (
    <Container maxWidth="lg">
      <Box mr={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Page:
          Next.js, Material-UI and TypeScript example!
        </Typography>
        <Link href="/">
          <Button variant="contained" color="primary">
            Go to the Index Page
          </Button>
        </Link>
      </Box>

    </Container>
  )
}


//Next prefetches pages before even navigating to it.
