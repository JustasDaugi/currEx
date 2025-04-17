import type React from "react"
import { CurrencyConverter } from "./components/CurrencyConverter"
import { ConversionHistory } from "./components/ConversionHistory"
import { StockMarketSection } from "./components/StockMarketSection"
import "./styles.css"

const CurrencyDashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="header">
        <h1>Currency Exchange Dashboard</h1>
        <p className="last-updated">Last updated: April 11, 2025</p>
      </header>

      <main className="main-content">
        <div className="dashboard-grid">
          <CurrencyConverter />
        </div>

        <StockMarketSection />

        <ConversionHistory />
      </main>
    </div>
  )
}

export default CurrencyDashboard
