from django.contrib import admin

from .models import HatModel


@admin.register(HatModel)
class HatModelAdmin(admin.ModelAdmin):
    pass
