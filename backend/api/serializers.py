from django.contrib.auth.models import User
from rest_framework import serializers
from .models import (
    Customer, 
    FinancialInstitution,
    Auction,
    RealEstate,
    Vehicle,
    BidHistory
)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']

class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = [
            'url',
            'name', 
            'user',
            'email', 
            'phone', 
            'cpf', 
            'address', 
            'number',
            'complement',
            'neighborhood',
            'city',
            'state',
            'zip_code',
            'status',
        ]

class FinancialInstitutionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FinancialInstitution
        fields = [
            'url',
            'name', 
            'email', 
            'phone', 
            'cnpj', 
            'status',
        ]

class AuctionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Auction
        fields = [
            'url',
            'financial_institution_id', 
            'name',
            'description',
            'start_date',
            'end_date',
            'status',
        ]

class RealEstateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RealEstate
        fields = [
            'url',
            'auction_id',
            'created_at',
            'type',
            'address',
            'number',
            'complement',
            'neighborhood',
            'city',
            'state',
            'zip_code',
            'latitude',
            'longitude',
            'area_total',
            'building_area',
            'status',
            'condition',
            'rooms',
            'minimum_bid',
            'minimum_bid_increment',
            'description',
            'images_url',
            'documents_url',
        ]

class VehicleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
            'url',
            'auction_id',
            'created_at',
            'brand',
            'model',
            'version',
            'chassis',
            'plate',
            'mileage',
            'year',
            'color',
            'fuel_type',
            'transmission',
            'doors',
            'category',
            'status',
            'minimum_bid',
            'minimum_bid_increment',
            'description',
            'images_url',
        ]

class BidHistorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BidHistory
        fields = [
            'url',
            'auction_id',
            'customer_id',
            'real_estate_id',
            'vehicle_id',
            'value',
            'status',
        ]
