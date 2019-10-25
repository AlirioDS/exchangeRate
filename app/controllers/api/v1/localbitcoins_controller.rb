module Api
  module V1
    class LocalbitcoinsController < ApplicationController

      def get_sellers
        instance_localbitcoins_client
        render json: @client.sellers(params["currency"])
      end

      def get_buyers
        instance_localbitcoins_client
        render json: @client.buyers(params["currency"])
      end

      private

      def instance_localbitcoins_client
        @client = LocalbitcoinsClient.new
      end
      
    end
  end
end
