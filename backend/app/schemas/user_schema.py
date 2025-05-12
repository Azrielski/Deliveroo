from marshmallow import Schema, fields, validate, ValidationError

# Helper function for password match validation
def validate_password_match(data):
    """Custom validator to ensure password and confirm_password match."""
    if data['password'] != data['confirm_password']:
        raise ValidationError("Passwords do not match.")

# Schema for User Registration
class UserRegisterSchema(Schema):
    first_name = fields.String(
        required=True,
        validate=validate.Length(min=1, error="first name must not be empty."),
        error_messages={"required": "First name is required."}
    )
    second_name = fields.String(
        required=True,
        validate=validate.Length(min=1, error="Second name must not be empty."),
        error_messages={"required": "Second name is required."}
    )
    username = fields.String(
        required=True,
        validate=validate.Length(min=1, error="Username must not be empty."),
        error_messages={"required": "Username is required."}
    )
    email = fields.Email(
        required=True,
        error_messages={
            "required": "Email is required.",
            "invalid": "Invalid email address format."
        }
    )
    password = fields.String(
        required=True,
        validate=[
            validate.Length(min=6, error="Password must be at least 6 characters long."),
            validate.Regexp(
                r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#]{6,}$',
                error=(
                    "Password must contain at least one letter, one number, and be at least 6 characters long."
                )
            )
        ],
        error_messages={"required": "Password is required."}
    )
    confirm_password = fields.String(
        required=True,
        error_messages={"required": "Password confirmation is required."}
    )
    is_admin = fields.Boolean(load_default=False)  


    # Method to validate passwords match
    def validate(self, data, **kwargs):
        validate_password_match(data)
        return data


# Schema for User Login
class UserLoginSchema(Schema):
    email = fields.Email(
        required=True,
        error_messages={
            "required": "Email is required.",
            "invalid": "Invalid email format."
        }
    )
    password = fields.String(
        required=True,
        error_messages={"required": "Password is required."}
    )


# Schema for Password Reset Request
class PasswordResetRequestSchema(Schema):
    email = fields.Email(
        required=True,
        error_messages={
            "required": "Email is required.",
            "invalid": "Invalid email format."
        }
    )


# Schema for Password Reset
class PasswordResetSchema(Schema):
    token = fields.Str(required=True)
    password = fields.String(
        required=True,
        validate=[
            validate.Length(min=6, error="Password must be at least 6 characters long."),
            validate.Regexp(
                r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#]{6,}$',
                error=(
                    "Password must contain at least one letter, one number, and be at least 6 characters long."
                )
            )
        ],
        error_messages={"required": "Password is required."}
    )
    confirm_password = fields.String(
        required=True,
        error_messages={"required": "Password confirmation is required."}
    )


    def validate(self, data, **kwargs):
        validate_password_match(data)
        return data


# Schema for User Base (Output/Serialization)
class UserBaseSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.String(dump_only=True)
    email = fields.Email(dump_only=True)
    is_admin = fields.Boolean(dump_only=True)
