import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  TrendingUp,
  TrendingDown,
  Globe,
  MapPin,
  ExternalLink,
  RefreshCw,
  BarChart3,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface MarketData {
  symbol: string;
  "regularMarketPrice.raw": number;
  "regularMarketChangePercent.raw": number;
  "regularMarketVolume.raw": number;
}

interface NewsItem {
  title: string;
  publisher: string;
  link: string;
}

interface IndianIndex {
  symbol: string;
  name: string;
  current_price: number | null;
  previous_close: number | null;
  change: number | null;
  change_percent: number | null;
  volume: number | null;
  status: string;
}

interface MarketSummary {
  top5_gainers_global: MarketData[];
  top5_losers_global: MarketData[];
  top5_gainers_india: MarketData[];
  top5_losers_india: MarketData[];
  indian_indices?: {
    nifty: IndianIndex;
    sensex: IndianIndex;
    banknifty: IndianIndex;
    midcap_nifty: IndianIndex;
  };
  global_news: NewsItem[];
  india_news: NewsItem[];
}

const MarketNewsSection = () => {
  const [marketData, setMarketData] = useState<MarketSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://aadhar-capital-backend.vercel.app/market-summary/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setMarketData(result.data);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        throw new Error('API returned unsuccessful response or no data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 10000000) return `${(volume / 10000000).toFixed(1)}Cr`;
    if (volume >= 100000) return `${(volume / 100000).toFixed(1)}L`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toString();
  };

  const formatPercentage = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const MarketCard = ({
    data,
    title,
    icon: Icon,
    isGainer
  }: {
    data: MarketData[],
    title: string,
    icon: any,
    isGainer: boolean
  }) => (
    <Card className="bg-white/90 backdrop-blur-sm shadow-glow border-white/20 h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className={`w-4 h-4 ${isGainer ? 'text-green-600' : 'text-red-600'}`} />
          <span className="text-sm font-semibold">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-xs truncate">{item.symbol}</div>
              <div className="text-xs text-gray-500">Vol: {formatVolume(item["regularMarketVolume.raw"])}</div>
            </div>
            <div className="text-right ml-2">
              <div className="font-bold text-xs">{formatPrice(item["regularMarketPrice.raw"])}</div>
              <div className={`text-xs font-semibold flex items-center gap-1 justify-end ${
                isGainer ? 'text-green-600' : 'text-red-600'
              }`}>
                {isGainer ? <ArrowUp className="w-2 h-2" /> : <ArrowDown className="w-2 h-2" />}
                {formatPercentage(item["regularMarketChangePercent.raw"])}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const IndexCard = ({ index }: { index: IndianIndex }) => {
    const hasData = (index.status === "live_data" || index.status === "history_data") && index.current_price !== null;
    const displayIsPositive = (index.change_percent || 0) >= 0;

    return (
      <Card className="bg-white/90 backdrop-blur-sm shadow-glow border-white/20 h-[200px] flex flex-col">
        <CardHeader className="pb-2 flex-shrink-0">
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold">{index.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          {hasData ? (
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Current Price</span>
                <span className="font-bold text-sm">{formatPrice(index.current_price!)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Change</span>
                <div className={`text-xs font-semibold flex items-center gap-1 ${
                  displayIsPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {displayIsPositive ? <ArrowUp className="w-2 h-2" /> : <ArrowDown className="w-2 h-2" />}
                  {formatPercentage(index.change_percent || 0)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Previous Close</span>
                <span className="text-xs">{formatPrice(index.previous_close!)}</span>
              </div>
              <div className="text-center pt-2">
                <Badge variant="outline" className={`text-xs ${
                  index.status === "live_data"
                    ? "text-green-600 border-green-200 bg-green-50"
                    : "text-blue-600 border-blue-200 bg-blue-50"
                }`}>
                  {index.status === "live_data" ? "Live Data" : "Historical Data"}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <div className="text-xs text-gray-500">Loading...</div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Financial quotes for when news is not available
  const financialQuotes = [
    {
      quote: "The stock market is filled with individuals who know the price of everything, but the value of nothing.",
      author: "Philip Fisher"
    },
    {
      quote: "Risk comes from not knowing what you're doing.",
      author: "Warren Buffett"
    },
    {
      quote: "The time to buy is when there's blood in the streets.",
      author: "Baron Rothschild"
    },
    {
      quote: "It's not how much money you make, but how much money you keep.",
      author: "Robert Kiyosaki"
    },
    {
      quote: "The best investment you can make is in yourself.",
      author: "Warren Buffett"
    },
    {
      quote: "Price is what you pay. Value is what you get.",
      author: "Warren Buffett"
    },
    {
      quote: "The four most dangerous words in investing are: 'This time it's different.'",
      author: "Sir John Templeton"
    },
    {
      quote: "Diversification is protection against ignorance. It makes little sense if you know what you are doing.",
      author: "Warren Buffett"
    }
  ];

  const getRandomQuote = () => {
    return financialQuotes[Math.floor(Math.random() * financialQuotes.length)];
  };

  const NewsCard = ({
    news,
    title,
    icon: Icon
  }: {
    news: NewsItem[],
    title: string,
    icon: any
  }) => {
    const randomQuote = getRandomQuote();

    return (
      <Card className="bg-white/90 backdrop-blur-sm shadow-glow border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon className="w-5 h-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {news.length > 0 ? (
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
              {news.map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg mb-3 last:mb-0">
                  <h4 className="font-semibold text-sm mb-2 line-clamp-2">{item.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.publisher}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => window.open(item.link, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 px-4">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xl">"</span>
                  </div>
                </div>
                <blockquote className="text-sm font-medium text-gray-700 mb-3 italic leading-relaxed">
                  {randomQuote.quote}
                </blockquote>
                <cite className="text-xs text-primary font-semibold">
                  — {randomQuote.author}
                </cite>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg">Loading market data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchMarketData} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-gradient-secondary">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-2">
            <BarChart3 className="w-4 h-4" />
            MARKET INSIGHTS
          </div>
          <h2 className="text-3xl font-bold mb-2">Live Market Updates</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-3">
            Stay informed with real-time market data, top gainers & losers, and latest financial news
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="text-xs">
              Last updated: {lastUpdated}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={fetchMarketData}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {marketData && (
          <div className="space-y-6">
            {/* Indian Market Indices */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Indian Market Indices</h3>
                <p className="text-sm text-gray-600">Live tracking of major Indian stock market indices</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <IndexCard index={marketData.indian_indices?.nifty || { symbol: "^NSEI", name: "Nifty", current_price: null, previous_close: null, change: null, change_percent: null, volume: null, status: "no_data" }} />
                <IndexCard index={marketData.indian_indices?.sensex || { symbol: "^BSESN", name: "Sensex", current_price: null, previous_close: null, change: null, change_percent: null, volume: null, status: "no_data" }} />
                <IndexCard index={marketData.indian_indices?.banknifty || { symbol: "^NSEBANK", name: "Bank Nifty", current_price: null, previous_close: null, change: null, change_percent: null, volume: null, status: "no_data" }} />
                <IndexCard index={marketData.indian_indices?.midcap_nifty || { symbol: "NIFTYMIDCAP50.NS", name: "Mid Cap Nifty", current_price: null, previous_close: null, change: null, change_percent: null, volume: null, status: "no_data" }} />
              </div>
            </div>

            {/* Market Data Cards - All 4 Together */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Top Gainers & Losers</h3>
                <p className="text-sm text-gray-600">Real-time tracking of best and worst performing stocks</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <MarketCard
                  data={marketData.top5_gainers_global}
                  title="Top 5 Global Gainers"
                  icon={TrendingUp}
                  isGainer={true}
                />
                <MarketCard
                  data={marketData.top5_losers_global}
                  title="Top 5 Global Losers"
                  icon={TrendingDown}
                  isGainer={false}
                />
                <MarketCard
                  data={marketData.top5_gainers_india}
                  title="Top 5 Indian Gainers"
                  icon={TrendingUp}
                  isGainer={true}
                />
                <MarketCard
                  data={marketData.top5_losers_india}
                  title="Top 5 Indian Losers"
                  icon={TrendingDown}
                  isGainer={false}
                />
              </div>
            </div>

            {/* News Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              <NewsCard
                news={marketData.global_news}
                title="Global Market News"
                icon={Globe}
              />
              <NewsCard
                news={marketData.india_news}
                title="Indian Market News"
                icon={MapPin}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketNewsSection;
