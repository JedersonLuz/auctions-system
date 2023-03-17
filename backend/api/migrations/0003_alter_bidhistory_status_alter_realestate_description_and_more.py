# Generated by Django 4.1.7 on 2023-03-17 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_customer_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bidhistory',
            name='status',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='realestate',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='realestate',
            name='documents_url',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='realestate',
            name='images_url',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='images_url',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='status',
            field=models.CharField(choices=[('novo', 'Novo'), ('semi', 'Semi-novo'), ('usado', 'Usado')], max_length=50),
        ),
    ]