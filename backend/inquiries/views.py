from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Inquiry
from .serializers import InquirySerializer


class InquiryCreateView(APIView):
    """Public endpoint to submit an enquiry."""

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = InquirySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(status=Inquiry.Status.NEW)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InquiryViewSet(viewsets.ModelViewSet):
    """Admin CRUD for enquiries."""

    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    pagination_class = None

    def get_permissions(self):
        return [AllowAny()]