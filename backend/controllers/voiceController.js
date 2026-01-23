/**
 * 语音助手控制器
 */

const VoiceAnalysis = require('../models/VoiceAnalysis');
const fs = require('fs');

/**
 * 上传语音文件
 * POST /api/voice/upload
 */
const uploadVoice = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: '请上传语音文件'
      });
    }

    // 创建语音分析记录
    const analysis = await VoiceAnalysis.create({
      userId: req.user._id,
      audioFile: {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileHash: req.file.hash,
        duration: 0 // TODO: 使用音频库获取时长
      },
      status: 'uploading'
    });

    // TODO: 调用语音识别API
    // 这里先返回模拟数据
    setTimeout(async () => {
      analysis.status = 'transcribing';
      await analysis.save();

      setTimeout(async () => {
        analysis.transcription = {
          text: '"这个统筹产品和保险一样，出事绝对给你赔"',
          segments: [],
          dialect: '普通话'
        };
        analysis.status = 'analyzing';
        await analysis.save();

        setTimeout(async () => {
          analysis.detection = {
            hasMisleading: true,
            riskLevel: 'high',
            misleadingSegments: [
              {
                text: '"这个统筹产品和保险一样，出事绝对给你赔"',
                severity: 'high',
                reason: '误导性话术：统筹产品不是保险，"绝对赔付"属于虚假承诺',
                warning: '请注意：此为典型误导话术！',
                position: 0
              }
            ],
            analyzedAt: new Date()
          };
          analysis.status = 'completed';
          await analysis.save();
        }, 1000);
      }, 1000);
    }, 500);

    res.status(201).json({
      success: true,
      message: '语音文件上传成功',
      data: {
        analysisId: analysis._id,
        status: 'uploading'
      }
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      message: '上传失败',
      error: error.message
    });
  }
};

/**
 * 获取语音分析结果
 * GET /api/voice/result/:id
 */
const getVoiceResult = async (req, res) => {
  try {
    const analysis = await VoiceAnalysis.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: '分析记录不存在'
      });
    }

    res.json({
      success: true,
      data: { analysis }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取分析结果失败',
      error: error.message
    });
  }
};

module.exports = {
  uploadVoice,
  getVoiceResult
};
