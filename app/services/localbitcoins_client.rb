class LocalbitcoinsClient
  def sellers(currency)
    @json = JSON.parse(sellers_response(currency))
    json_sellers = @json.dig("data", "ad_list")

    while next_page? do
      @pagination = true
      @json = JSON.parse(sellers_response(currency))
      json_sellers += @json.dig("data", "ad_list")
    end

    json_sellers
  end
  
  def buyers(currency)
    @json = JSON.parse(buyers_response(currency))
    json_buyers = @json.dig("data", "ad_list")

    while next_page? do
      @pagination = true
      @json = JSON.parse(buyers_response(currency))
      json_buyers += @json.dig("data", "ad_list")
    end

    json_buyers
  end

  private
  
  def sellers_response(currency)
    if @pagination.eql? true
      HTTParty.get(
        "https://localbitcoins.com/buy-bitcoins-online/#{currency}/c/bank-transfers/.json?page=#{next_page}",
        format: :plain
      )
    else
      HTTParty.get(
        "https://localbitcoins.com/buy-bitcoins-online/#{currency}/c/bank-transfers/.json",
        format: :plain
      )
    end
  end

  def buyers_response(currency)
    if @pagination.eql? true
      HTTParty.get(
        "https://localbitcoins.com/sell-bitcoins-online/#{currency}/transfers-with-specific-bank/.json?page=#{next_page}", 
        format: :plain
      )
    else
      HTTParty.get(
        "https://localbitcoins.com/sell-bitcoins-online/#{currency}/transfers-with-specific-bank/.json",
        format: :plain
      )
    end
  end

  def next_page?
    @json.dig("pagination", "next").present?
  end

  def next_page
    @json.dig("pagination", "next").split("page=").last if next_page?
  end


end
