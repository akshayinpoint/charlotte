# Copyright 2019 XAMES3. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
# implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# ======================================================================
"""
C.H.A.R.L.O.T.T.E - Conversational Heuristic Assistant Recognizing
Language Oriented Task & Thought Expressions

``C.H.A.R.L.O.T.T.E`` is an open-source, natural language ui.

Read complete documentation at: <https://github.com/xames3/charlotte>.
"""
# The following comment should be removed at some point in the future.
# pylint: disable=import-error
# pylint: disable=no-name-in-module

from setuptools import find_packages, setup

from charlotte.utils.settings import (AUTHOR, MAINTAINER_EMAIL,
                                      PACKAGE_NAME, PACKAGE_VERSION)

DOCLINES = __doc__.split('\n')

# This package adheres to Semantic Versioning Specification (SemVer)
# starting with version 0.0.1.
VERSION = PACKAGE_VERSION

REQUIRED_PACKAGES = [
    'pyxa',
    'rasa']


def use_readme() -> str:
    """Uses ``README.md`` file for parsing long description."""
    with open('README.md') as file:
        return file.read()


setup(name=PACKAGE_NAME,
      version=VERSION,
      url='https://github.com/xames3/charlotte/',
      download_url='https://github.com/xames3/charlotte/tags',
      author=AUTHOR,
      author_email=MAINTAINER_EMAIL,
      maintainer=AUTHOR,
      maintainer_email=MAINTAINER_EMAIL,
      classifiers=[
          'Development Status :: 3 - Alpha',
          'License :: OSI Approved :: Apache Software License',
          'Operating System :: Microsoft :: Windows :: Windows 10',
          'Programming Language :: Python :: 3.5',
          'Programming Language :: Python :: 3.6',
          'Programming Language :: Python :: 3.7',
          'Programming Language :: Python :: 3.8',
          'Programming Language :: Python :: 3 :: Only',
          'Topic :: Communications :: Chat',
          'Topic :: Scientific/Engineering',
          'Topic :: Scientific/Engineering :: Artificial Intelligence',
      ],
      license='Apache 2.0',
      description=f'{DOCLINES[1]} {DOCLINES[2]}',
      long_description=use_readme(),
      long_description_content_type='text/markdown',
      keywords='charlotte ai pyxa artificial intelligence',
      zip_safe=False,
      install_requires=REQUIRED_PACKAGES,
      python_requires='~=3.5',
      include_package_data=True,
      packages=find_packages())
