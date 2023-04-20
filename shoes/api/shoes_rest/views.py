from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import BinVO, Shoe
# Create your views here.
class BinVoEncoder(ModelEncoder):
    model= BinVO
    properties= ["import_href", "closet_name", "bin_number", "bin_size"]


class ShoeDetailEncoder(ModelEncoder):
    model= Shoe
    properties= ["manufacturer", "model_name", "color", "picture_url", "bin",]
    encoders={"bin": BinVoEncoder()}

class ShoeListEncoder(ModelEncoder):
    model=Shoe
    properties= [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "id",
        "bin",
        ]
    encoders={"bin":BinVoEncoder()}

@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    # GET Request Handling
    if request.method == "GET":
        if bin_vo_id is not None:
            shoe = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoe = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoe},
            encoder=ShoeListEncoder,
        )
    else:
        content= json.loads(request.body)

        bin = BinVO.objects.get(import_href=content["bin"])
        print(content)
        content["bin"]=bin
        shoes= Shoe.objects.create(**content)
        return  JsonResponse(
            shoes,
            encoder=ShoeDetailEncoder,
            safe=False
        )

@require_http_methods(["GET", "DELETE"])
def api_show_shoe(request, id):
    if request.method == "GET":
        try:
            shoe= Shoe.objects.get(id=id)
            return JsonResponse(
                shoe,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            return JsonResponse({"message": "invalid shoe id"}, status=400,)
    elif request.method == "DELETE":
        count,_= Shoe.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": count >0})
    else:
        content= json.loads(request.body)
        Shoe.objects.filter(id=id).update(**content)
        shoe= Shoe.objects.get(id=id)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
