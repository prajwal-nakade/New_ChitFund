from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cheatfund", "0003_rename_name_users_firstname_remove_nominee_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="nominee",
            name="firstname",
            field=models.CharField(max_length=50, blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="nominee",
            name="lastname",
            field=models.CharField(max_length=50, blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="nominee",
            name="middlename",
            field=models.CharField(max_length=50, blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="users",
            name="lastname",
            field=models.CharField(max_length=50, blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="users",
            name="middlename",
            field=models.CharField(max_length=50, blank=True, null=True),
        ),
    ]
