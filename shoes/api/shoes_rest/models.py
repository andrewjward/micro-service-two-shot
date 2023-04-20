from django.db import models

# Create your models here.


class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()
    import_href = models.URLField(max_length=200, null=True, unique=True)


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=50)
    model_name = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    picture_url = models.URLField(max_length=200, null=True, blank=True)
    bin = models.ForeignKey(
        BinVO, related_name="shoes", on_delete=models.CASCADE, null=True
    )


# Create your models here.
