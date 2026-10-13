#!/usr/bin/env bash
set -euo pipefail

demo_output_dir="${DEMO_OUTPUT_DIR:-artifacts/demo}"
mkdir -p "$demo_output_dir"

npm run capture:demo

ffmpeg -hide_banner -loglevel error -y \
  -i "$demo_output_dir/roe-ai-demo.webm" \
  -vf "scale=1280:720:flags=lanczos,fps=15" \
  -c:v libx264 -pix_fmt yuv420p -movflags +faststart \
  "$demo_output_dir/roe-ai-demo.mp4"

ffmpeg -hide_banner -loglevel error -y \
  -i "$demo_output_dir/roe-ai-demo.webm" \
  -vf "fps=8,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" \
  -loop 0 "$demo_output_dir/roe-ai-demo.gif"

ffprobe -v error -show_entries stream=codec_name,width,height,nb_frames \
  -of default=noprint_wrappers=1 "$demo_output_dir/roe-ai-demo.mp4"
ffprobe -v error -show_entries stream=codec_name,width,height,nb_frames \
  -of default=noprint_wrappers=1 "$demo_output_dir/roe-ai-demo.gif"
