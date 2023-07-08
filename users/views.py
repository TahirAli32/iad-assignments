from rest_framework import generics
from rest_framework.response import Response
from .models import Users
from .serializers import UsersSerializer

class UsersListAPIView(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class UsersListCreateAPIView(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user_data = {
            'email': email,
            'password': password
        }

        serializer = self.get_serializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)
