from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import LocationVO, HatModel

# Create your views here.
class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["name", "import_href"]


class HatsEncoder(ModelEncoder):
    model = HatModel
    properties = [
        "id",
        "fabric",
        "style_name",
        "color",
        "url",
        ]

    # def get_extra_data(self, o):
    #     return {"location": o.location.style_name}

@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):

    if request.method == "GET":
        if location_vo_id is not None:
            hats = HatModel.objects.filter(location=location_vo_id)
        else:
            hats = HatModel.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatsEncoder,
        )
    else:
        content = json.loads(request.body)

        # Get the Location object and put it in the content dict
        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )
        hat = HatModel.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatsEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_hat(request, pk):
    """
    Single-object API for the Location resource.

    GET:
    Returns the information for a Location resource based
    on the value of pk
    {
        "id": database id for the location,
        "closet_name": location's closet name,
        "section_number": the number of the wardrobe section,
        "shelf_number": the number of the shelf,
        "href": URL to the location,
    }

    PUT:
    Updates the information for a Location resource based
    on the value of the pk
    {
        "closet_name": location's closet name,
        "section_number": the number of the wardrobe section,
        "shelf_number": the number of the shelf,
    }

    DELETE:
    Removes the location resource from the application
    """
    if request.method == "GET":
        try:
            hat = HatModel.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatsEncoder,
                safe=False
            )
        except HatModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            location = HatModel.objects.get(id=pk)
            location.delete()
            return JsonResponse(
                location,
                encoder=HatsEncoder,
                safe=False,
            )
        except HatModel.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            location = HatModel.objects.get(id=pk)

            props = ["fabric", "style_name", "color", "url", "location"]
            for prop in props:
                if prop in content:
                    setattr(location, prop, content[prop])
            location.save()
            return JsonResponse(
                location,
                encoder=HatsEncoder,
                safe=False,
            )
        except HatModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
