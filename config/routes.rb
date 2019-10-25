Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/localbitcoins/service/sellers', to: 'localbitcoins#get_sellers'
      post '/localbitcoins/service/sellers', to: 'localbitcoins#get_sellers'

      get '/localbitcoins/service/buyers', to: 'localbitcoins#get_buyers'
      post '/localbitcoins/service/buyers', to: 'localbitcoins#get_buyers'
    end
  end

  root to: "home#index"
end
