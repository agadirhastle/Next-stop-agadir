from PIL import Image, ImageDraw, ImageFont
for size in [192,512]:
 img=Image.new('RGB',(size,size),'#FF6B00')
 d=ImageDraw.Draw(img)
 d.ellipse([size*0.15,size*0.15,size*0.85,size*0.85],fill='#0F1F2F')
 # tekst AGADIR
 try:
  f=ImageFont.truetype("arial.ttf", size//8)
 except:
  f=ImageFont.load_default()
 d.text((size/2,size/2),"AGADIR",fill='#FF6B00',anchor='mm',font=f)
 img.save(f'public/icon-{size}.png')
