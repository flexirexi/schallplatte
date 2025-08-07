from django import forms
from .models import Profile


class EditProfileForm(forms.ModelForm):
    # Zusätzliche Felder aus User
    username = forms.CharField(max_length=150, required=False)
    email = forms.EmailField(required=False)

    class Meta:
        model = Profile
        fields = ["firstname", "lastname", "instruments", "about"]

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop("user", None)
        super(EditProfileForm, self).__init__(*args, **kwargs)

        if self.user:
            self.fields["username"].initial = self.user.username
            self.fields["email"].initial = self.user.email

    def save(self, commit=True):
        profile = super(EditProfileForm, self).save(commit=False)

        if self.user:
            self.user.username = self.cleaned_data["username"]
            self.user.email = self.cleaned_data["email"]
            if commit:
                self.user.save()

        if commit:
            profile.save()

        return profile
