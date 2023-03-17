from django.contrib import admin
from api.models import (
    Customer, 
    FinancialInstitution, 
    Auction, 
    RealEstate, 
    Vehicle, 
    BidHistory
)

admin.site.register(Customer)
admin.site.register(FinancialInstitution)
admin.site.register(Auction)
admin.site.register(RealEstate)
admin.site.register(Vehicle)
admin.site.register(BidHistory)
