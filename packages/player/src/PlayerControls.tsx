import React, {useCallback, useMemo} from 'react';
import {Internals} from 'remotion';
import {formatTime} from './format-time';
import {FullscreenIcon, PauseIcon, PlayIcon} from './icons';
import {PlayerSeekBar} from './PlayerSeekBar';
import {usePlayer} from './use-player';

const containerStyle: React.CSSProperties = {
	boxSizing: 'border-box',
	position: 'absolute',
	bottom: 0,
	width: '100%',
	paddingTop: 40,
	paddingBottom: 10,
	background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.4))',
	display: 'flex',
	paddingRight: 12,
	paddingLeft: 12,
	flexDirection: 'column',
	transition: 'opacity 0.3s',
};

const buttonStyle: React.CSSProperties = {
	appearance: 'none',
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
	padding: 0,
	display: 'inline',
	marginBottom: 0,
	height: 25,
};

const controlsRow: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	alignItems: 'center',
	justifyContent: 'space-between',
	userSelect: 'none',
};

const leftPartStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	userSelect: 'none',
	alignItems: 'center',
};

const xSpacer: React.CSSProperties = {
	width: 10,
};

const ySpacer: React.CSSProperties = {
	height: 8,
};

const fullscreen: React.CSSProperties = {
	justifyItems: 'flex-end',
};

const timeLabel: React.CSSProperties = {
	color: 'white',
	fontFamily: 'sans-serif',
	fontSize: 14,
};

export const Controls: React.FC<{
	fps: number;
	durationInFrames: number;
	hovered: boolean;
	player: ReturnType<typeof usePlayer>;
	requestFullScreenAccess: () => void;
	isFullscreen: boolean;
}> = ({
	durationInFrames,
	hovered,
	isFullscreen,
	fps,
	player,
	requestFullScreenAccess,
}) => {
	const frame = Internals.Timeline.useTimelinePosition();

	const containerCss: React.CSSProperties = useMemo(() => {
		// Hide if playing and mouse outside
		const shouldShow = hovered || !player.playing;
		return {
			...containerStyle,
			opacity: Number(shouldShow),
		};
	}, [hovered, player.playing]);

	const exitFullscreen = useCallback(() => {
		document.exitFullscreen();
	}, []);

	return (
		<div style={containerCss}>
			<div style={controlsRow}>
				<div style={leftPartStyle}>
					<button
						type="button"
						style={buttonStyle}
						onClick={player.playing ? player.pause : player.play}
						aria-label={player.playing ? 'Pause video' : 'Play video'}
						title={player.playing ? 'Pause video' : 'Play video'}
					>
						{player.playing ? <PauseIcon /> : <PlayIcon />}
					</button>
					<div style={xSpacer} />
					<div style={timeLabel}>
						{formatTime(frame / fps)} / {formatTime(durationInFrames / fps)}
					</div>
				</div>
				<div style={fullscreen}>
					<button
						type="button"
						aria-label={'Fullscreen'}
						title={'Fullscreen'}
						style={buttonStyle}
						onClick={isFullscreen ? exitFullscreen : requestFullScreenAccess}
					>
						<FullscreenIcon />
					</button>
				</div>
			</div>
			<div style={ySpacer} />
			<PlayerSeekBar durationInFrames={durationInFrames} />
		</div>
	);
};
