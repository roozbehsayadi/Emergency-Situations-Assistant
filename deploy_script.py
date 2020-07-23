from distutils.dir_util import copy_tree
import os
import json

# change these folders as you like
current_folder = 'Emergency-Situations-Assistant'
deploy_folder = 'Deploy-Emergency-Situations-Assistant'
back_folder = 'back'
front_folder = 'front'

#login to heroku
# os.system('heroku login')

# copy the back folder into the deploy folder
src = f'{back_folder}'
dest = f'../{deploy_folder}/{back_folder}'
copy_tree(src, dest)

#git init
os.chdir(f'../{deploy_folder}')
os.system('git init')

# heroku create so you could get the server url
create_reponse = os.popen('heroku create').read()
url = create_reponse.split()[0]
os.chdir(f'../{current_folder}')

# put website link in package.json and copy the local url.
with open(f'{front_folder}/package.json', 'r', encoding='utf-8') as front_packge:
    front_packge_data = json.load(front_packge)
    local_url = front_packge_data['proxy']
    front_packge_data['proxy'] = url

with open(f'{front_folder}/package.json', 'w', encoding='utf-8') as front_packge:
    json.dump(front_packge_data, front_packge, ensure_ascii=False, indent=4)

# run build
os.chdir(f'{front_folder}')
os.system('npm run build')
os.chdir('..')

# copy build from src to dest
src = f'{front_folder}/build'
dest = f'../{deploy_folder}/{back_folder}/src/build'
copy_tree(src, dest)

# commit files and create a push on heroku
os.chdir(f'../{deploy_folder}')
os.system('git add .')
os.system('git commit -m "added files."')
os.system('git push heroku master')
os.chdir(f'../{current_folder}')

# change back the proxy in package to local url.
with open(f'{front_folder}/package.json', 'r', encoding='utf-8') as front_packge:
    front_packge_data = json.load(front_packge)
    front_packge_data['proxy'] = local_url

with open(f'{front_folder}/package.json', 'w', encoding='utf-8') as front_packge:
    json.dump(front_packge_data, front_packge, ensure_ascii=False, indent=4)
