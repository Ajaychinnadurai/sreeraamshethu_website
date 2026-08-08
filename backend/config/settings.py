import environ
import os
from .base import *  # noqa: F401,F403

environ.Env.read_env(os.path.join(BASE_DIR, ".env"))