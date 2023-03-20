from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework import permissions

from api.serializers import (
    UserSerializer,
    CustomerSerializer,
    FinancialInstitutionSerializer,
    AuctionSerializer,
    RealEstateSerializer,
    VehicleSerializer,
    BidHistorySerializer
)

from .models import (
    Customer,
    FinancialInstitution,
    Auction,
    RealEstate,
    Vehicle,
    BidHistory
)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    
    permission_classes_by_action = {
        'create': [permissions.IsAdminUser],
        'list': [permissions.IsAuthenticated],
        'retrieve': [permissions.IsAuthenticated],
        'update': [permissions.IsAdminUser],
        'destroy': [permissions.IsAdminUser],
    }

    def get_queryset(self):
        queryset = User.objects.all()
        username = self.request.query_params.get('username')
        if username is not None:
            queryset = queryset.filter(username=username)
        return queryset

    def get_permissions(self):
        try:
            # return permission_classes depending on `action` 
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

class CustomerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    permission_classes_by_action = {
        'create': [permissions.IsAdminUser],
        'list': [permissions.IsAuthenticated],
        'retrieve': [permissions.IsAuthenticated],
        'update': [permissions.IsAdminUser],
        'destroy': [permissions.IsAdminUser],
    }

    def get_queryset(self):
        queryset = Customer.objects.all()
        user = self.request.query_params.get('user')
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset

    def get_permissions(self):
        try:
            # return permission_classes depending on `action` 
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

class FinancialInstitutionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = FinancialInstitution.objects.all()
    serializer_class = FinancialInstitutionSerializer
    
    permission_classes_by_action = {
        'create': [permissions.IsAdminUser],
        'list': [permissions.IsAuthenticated],
        'retrieve': [permissions.IsAuthenticated],
        'update': [permissions.IsAdminUser],
        'destroy': [permissions.IsAdminUser],
    }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action` 
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

class AuctionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    
    permission_classes_by_action = {
        'create': [permissions.IsAdminUser],
        'list': [permissions.IsAuthenticated],
        'retrieve': [permissions.IsAuthenticated],
        'update': [permissions.IsAdminUser],
        'destroy': [permissions.IsAdminUser],
    }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action` 
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

class RealEstateViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = RealEstate.objects.all().order_by('-created_at')
    serializer_class = RealEstateSerializer
    
    permission_classes_by_action = {
        'create': [permissions.IsAdminUser],
        'list': [permissions.IsAuthenticated],
        'retrieve': [permissions.IsAuthenticated],
        'update': [permissions.IsAdminUser],
        'destroy': [permissions.IsAdminUser],
    }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action` 
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

class VehicleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Vehicle.objects.all().order_by('-created_at')
    serializer_class = VehicleSerializer
    
    permission_classes_by_action = {
        'create': [permissions.IsAdminUser],
        'list': [permissions.IsAuthenticated],
        'retrieve': [permissions.IsAuthenticated],
        'update': [permissions.IsAdminUser],
        'destroy': [permissions.IsAdminUser],
    }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action` 
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

class BidHistoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = BidHistory.objects.all()
    serializer_class = BidHistorySerializer
    
    permission_classes_by_action = {
        'create': [permissions.IsAuthenticated],
        'list': [permissions.IsAuthenticated],
        'retrieve': [permissions.IsAuthenticated],
        'update': [permissions.IsAdminUser],
        'destroy': [permissions.IsAdminUser],
    }

    def get_queryset(self):
        queryset = BidHistory.objects.all()
        product_type = self.request.query_params.get('product_type')
        product_id = self.request.query_params.get('product_id')
        if product_type is not None and product_id is not None:
            if product_type == 'vehicles':
                queryset = queryset.filter(vehicle_id=product_id).order_by('-created_at')
            elif product_type == 'real-estates':
                queryset = queryset.filter(real_estate_id=product_id).order_by('-created_at')
        return queryset

    def get_permissions(self):
        try:
            # return permission_classes depending on `action` 
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]
