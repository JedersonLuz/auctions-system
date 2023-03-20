from django.db import models
from django.contrib.auth.models import User

# Model of a customer
class Customer(models.Model):
    # The customer's id
    id = models.AutoField(primary_key=True)
    # The customer's user id
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # Created at
    created_at = models.DateTimeField(auto_now_add=True)
    # Updated at
    updated_at = models.DateTimeField(auto_now=True)
    # The customer's name
    name = models.CharField(max_length=100)
    # The customer's email
    email = models.CharField(max_length=100)
    # The customer's phone
    phone = models.CharField(max_length=100)
    # The customer's cpf
    cpf = models.CharField(max_length=100)
    # The customer's address
    address = models.CharField(max_length=100)
    # The customer's number
    number = models.IntegerField()
    # The customer's complement
    complement = models.CharField(max_length=100, blank=True)
    # The customer's neighborhood
    neighborhood = models.CharField(max_length=100)
    # The customer's city
    city = models.CharField(max_length=100)
    # The customer's state
    state = models.CharField(max_length=100)
    # The customer's zip code
    zip_code = models.CharField(max_length=100)
    # The customer's status
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Model of a financial institution
class FinancialInstitution(models.Model):
    # The financial institution's id
    id = models.AutoField(primary_key=True)
    # Created at
    created_at = models.DateTimeField(auto_now_add=True)
    # Updated at
    updated_at = models.DateTimeField(auto_now=True)
    # The financial institution's name
    name = models.CharField(max_length=100)
    # The financial institution's email
    email = models.CharField(max_length=100)
    # The financial institution's phone
    phone = models.CharField(max_length=100)
    # The financial institution's cnpj
    cnpj = models.CharField(max_length=100)
    # The financial institution's status
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Model of a auction
class Auction(models.Model):
    # The auction's id
    id = models.AutoField(primary_key=True)
    # Created at
    created_at = models.DateTimeField(auto_now_add=True)
    # Updated at
    updated_at = models.DateTimeField(auto_now=True)
    # Financial institution's id of the auction
    financial_institution_id = models.ForeignKey(FinancialInstitution, on_delete=models.CASCADE)
    # The auction's name
    name = models.CharField(max_length=100)
    # The auction's description
    description = models.CharField(max_length=200)
    # The auction's start date
    start_date = models.DateTimeField()
    # The auction's end date
    end_date = models.DateTimeField()
    # The auction's status
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.name
  
# Model of a real estate to be selled in a auction
class RealEstate(models.Model):
    # The real state's id
    id = models.AutoField(primary_key=True)
    # The auction's id that the real state belongs to
    auction_id = models.ForeignKey(Auction, on_delete=models.CASCADE)
    # The real state's creation date
    created_at = models.DateTimeField(auto_now_add=True)
    # Updated at
    updated_at = models.DateTimeField(auto_now=True)
    # The real state's type
    type = models.CharField(
        max_length=100,
        choices=(
            ('terreno', 'Terreno'),
            ('casa', 'Casa'),
            ('apartamento', 'Apartamento'),
            ('cormercial', 'Comercial'),
            ('rural', 'Rural')
        )
    )
    # The real state's address
    address = models.CharField(max_length=100)
    # The real state's number
    number = models.IntegerField()
    # The real state's complement
    complement = models.CharField(max_length=100, blank=True)
    # The real state's neighborhood
    neighborhood = models.CharField(max_length=100)
    # The real state's city
    city = models.CharField(max_length=100)
    # The real state's state
    state = models.CharField(max_length=100)
    # The real state's zip code
    zip_code = models.CharField(max_length=100)
    # The real state's GPS latitude
    latitude = models.FloatField()
    # The real state's GPS longitude
    longitude = models.FloatField()
    # The real state's area total
    area_total = models.FloatField()
    # The real state's building area
    building_area = models.FloatField()
    # The real state's status
    status = models.CharField(
        max_length=100,
        choices=(
            ('ocupado', 'Ocupado'),
            ('desocupado', 'Desocupado')
        )
    )
    # The real state's condition
    condition = models.CharField(
        max_length=100,
        choices=(
            ('novo', 'Novo'),
            ('exige_reforma', 'Exige reforma'),
            ('possui_dividas', 'Possui dividas')
        )
    )
    # The real state's rooms
    rooms = models.IntegerField() 
    # The real state's minimum bid
    minimum_bid = models.FloatField()
    # The real state's minimum bid increment
    minimum_bid_increment = models.FloatField()
    # The real state's description
    description = models.TextField(null=True, blank=True)
    # The real state's image
    images_url = models.CharField(max_length=200, null=True, blank=True)
    # The real state's documents
    documents_url = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.address + ', ' + str(self.number) + ' - ' + self.city + '/' + self.state

# Model of a vehicle to be selled in a auction
class Vehicle(models.Model):
    # The vehicle's id
    id = models.AutoField(primary_key=True)
    # The auction's id that the vehicle belongs to
    auction_id = models.ForeignKey(Auction, on_delete=models.CASCADE)
    # The vehicle's creation date
    created_at = models.DateTimeField(auto_now_add=True)
    # Updated at
    updated_at = models.DateTimeField(auto_now=True)
    # The vehicle's brand
    brand = models.CharField(max_length=100)
    # The vehicle's model
    model = models.CharField(max_length=100)
    # The vehicle's version
    version = models.CharField(max_length=100)
    # The vehicle's chassis
    chassis = models.CharField(max_length=100)
    # The vehicle's plate
    plate = models.CharField(max_length=100)
    # The vehicle's mileage
    mileage = models.IntegerField()
    # The vehicle's year
    year = models.IntegerField()
    # The vehicle's color
    color = models.CharField(max_length=100)
    # The vehicle's fuel type
    fuel_type = models.CharField(max_length=100)
    # The vehicle's transmission
    transmission = models.CharField(max_length=100)
    # The vehicle's doors
    doors = models.IntegerField()
    # The vehicle's category
    category = models.CharField(max_length=100)
    # The vehicle's status
    status = models.CharField(
        max_length=100, 
        choices=(
            ('novo', 'Novo'),
            ('semi', 'Semi-novo'),
            ('usado', 'Usado')
        ))
    # The real state's minimum bid
    minimum_bid = models.FloatField()
    # The real state's minimum bid increment
    minimum_bid_increment = models.FloatField()
    # The vehicle's description
    description = models.TextField(null=True, blank=True)
    # The vehicle's image
    images_url = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.brand + ' ' + self.model

class BidHistory(models.Model):
    # The bid history's id
    id = models.AutoField(primary_key=True)
    # The auction's id that the bid history belongs to
    auction_id = models.ForeignKey(Auction, on_delete=models.CASCADE)
    # The customer's id that the bid history belongs to
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    # The real estate's id that the bid history belongs to
    real_estate_id = models.ForeignKey(RealEstate, on_delete=models.CASCADE, null=True, blank=True)
    # The vehicle's id that the bid history belongs to
    vehicle_id = models.ForeignKey(Vehicle, on_delete=models.CASCADE, null=True, blank=True)
    # The bid history's creation date
    created_at = models.DateTimeField(auto_now_add=True)
    # Updated at
    updated_at = models.DateTimeField(auto_now=True)
    # The bid history's value
    value = models.FloatField()
    # The bid history's status
    status = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.customer_id.name + ' - ' + str(self.value)
