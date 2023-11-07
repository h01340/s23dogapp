import TabMenu from "./components/TabMenu"
import { AppBar, Typography } from '@mui/material'

function App() {
  return (
    <>
    <AppBar position="static">
        <Typography variant="h5">
          Kaupan tuotteet
        </Typography>
        </AppBar>
      <TabMenu />

    </>
  )
}

export default App
